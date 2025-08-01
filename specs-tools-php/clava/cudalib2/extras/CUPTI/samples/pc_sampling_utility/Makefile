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
    LIBS= -lcuda -L $(LIB_PATH) -lcupti -lpcsamplingutil
else
    ifeq ($(OS), Darwin)
        export DYLD_LIBRARY_PATH := $(DYLD_LIBRARY_PATH):$(LIB_PATH)
        LIBS= -Xlinker -framework -Xlinker cuda -L $(EXTRAS_LIB_PATH) -L $(LIB_PATH) -lcupti -lpcsamplingutil
    else
        export LD_LIBRARY_PATH := $(LD_LIBRARY_PATH):$(LIB_PATH)
        LIBS = -L $(LIB_PATH) -lcuda -L $(EXTRAS_LIB_PATH) -lcupti -lpcsamplingutil
    endif
endif

NVCCFLAGS :=
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

all: pc_sampling_utility
pc_sampling_utility: pc_sampling_utility.cpp
	$(NVCC) $(NVCCFLAGS) $(INCLUDES) -o pc_sampling_utility $< $(LIBS)
clean:
	rm pc_sampling_utility
