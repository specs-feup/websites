#
# Copyright 2014-2021 NVIDIA Corporation. All rights reserved
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

# Gencode arguments
SMS ?= 52 53 60 61 62 70 72 75 80 86
# Generate SASS code for each SM architecture listed in $(SMS)
$(foreach sm,$(SMS),$(eval GENCODE_FLAGS += -gencode arch=compute_$(sm),code=sm_$(sm)))

pc_sampling: pc_sampling.$(OBJ)
	$(NVCC) -o $@ pc_sampling.$(OBJ) $(LIBS)

pc_sampling.$(OBJ): pc_sampling.cu
	$(NVCC) -arch=sm_52 -lineinfo $(GENCODE_FLAGS) -c $(INCLUDES) $<

run: pc_sampling
	./$<

clean:
	rm -f pc_sampling pc_sampling.$(OBJ)

