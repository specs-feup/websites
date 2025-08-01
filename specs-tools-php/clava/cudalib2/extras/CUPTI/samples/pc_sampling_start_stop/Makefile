#
# Copyright 2020-2021 NVIDIA Corporation. All rights reserved
#
ifndef OS
 OS   := $(shell uname)
 HOST_ARCH := $(shell uname -m)
endif

CUDA_INSTALL_PATH ?= ../../../..
NVCC := "$(CUDA_INSTALL_PATH)/bin/nvcc"
INCLUDES := -I"$(CUDA_INSTALL_PATH)/include" -I../../include

ifeq ($(OS),Windows_NT)
    LIB_PATH ?= ..\..\lib64
else
    EXTRAS_LIB_PATH := ../../lib64
    LIB_PATH ?= $(CUDA_INSTALL_PATH)/lib64
endif

ifeq ($(OS),Windows_NT)
    export PATH := $(PATH):$(LIB_PATH)
    LIBS= -lcuda -L $(LIB_PATH) -lcupti
    OBJ = obj
else
    ifeq ($(OS), Darwin)
        export DYLD_LIBRARY_PATH := $(DYLD_LIBRARY_PATH):$(LIB_PATH)
        LIBS= -Xlinker -framework -Xlinker cuda -L $(LIB_PATH) -lcupti
    else
        export LD_LIBRARY_PATH := $(LD_LIBRARY_PATH):$(LIB_PATH)
        LIBS = -L $(EXTRAS_LIB_PATH) -lcuda -L $(LIB_PATH) -lcupti
    endif
    OBJ = o
endif

ifneq ($(TARGET_ARCH), $(HOST_ARCH))
    ifeq ($(TARGET_ARCH), aarch64)
        ifeq ($(TARGET_OS), linux)
            HOST_COMPILER ?= aarch64-linux-gnu-g++
        endif
    endif

    ifdef HOST_COMPILER
        NVCCFLAGS := -ccbin $(HOST_COMPILER)
    endif
endif

# Gencode arguments
SMS ?= 70 75 80 86
# Generate SASS code for each SM architecture listed in $(SMS)
$(foreach sm,$(SMS),$(eval GENCODE_FLAGS += -gencode arch=compute_$(sm),code=sm_$(sm)))

pc_sampling_start_stop: pc_sampling_start_stop.$(OBJ)
	$(NVCC) $(NVCCFLAGS) -o $@ pc_sampling_start_stop.$(OBJ) $(LIBS)

pc_sampling_start_stop.$(OBJ): pc_sampling_start_stop.cu
	$(NVCC) $(NVCCFLAGS) $(GENCODE_FLAGS) -lineinfo  -c $(INCLUDES) $<

run: pc_sampling_start_stop
	./$<

clean:
	rm -f pc_sampling_start_stop pc_sampling_start_stop.$(OBJ)

