#ifndef CUDAD3D10TYPEDEFS_H
#define CUDAD3D10TYPEDEFS_H

// Dependent includes for cudaD3D10.h
#include <rpcsal.h>
#include <D3D10_1.h>

#include <cudaD3D10.h>

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

/*
 * Macros for the latest version for each driver function in cudaD3D10.h
 */
#define PFN_cuD3D10GetDevice  PFN_cuD3D10GetDevice_v2010
#define PFN_cuD3D10GetDevices  PFN_cuD3D10GetDevices_v3020
#define PFN_cuGraphicsD3D10RegisterResource  PFN_cuGraphicsD3D10RegisterResource_v3000
#define PFN_cuD3D10CtxCreate  PFN_cuD3D10CtxCreate_v3020
#define PFN_cuD3D10CtxCreateOnDevice  PFN_cuD3D10CtxCreateOnDevice_v3020
#define PFN_cuD3D10GetDirect3DDevice  PFN_cuD3D10GetDirect3DDevice_v3020
#define PFN_cuD3D10RegisterResource  PFN_cuD3D10RegisterResource_v2010
#define PFN_cuD3D10UnregisterResource  PFN_cuD3D10UnregisterResource_v2010
#define PFN_cuD3D10MapResources  PFN_cuD3D10MapResources_v2010
#define PFN_cuD3D10UnmapResources  PFN_cuD3D10UnmapResources_v2010
#define PFN_cuD3D10ResourceSetMapFlags  PFN_cuD3D10ResourceSetMapFlags_v2010
#define PFN_cuD3D10ResourceGetMappedArray  PFN_cuD3D10ResourceGetMappedArray_v2010
#define PFN_cuD3D10ResourceGetMappedPointer  PFN_cuD3D10ResourceGetMappedPointer_v3020
#define PFN_cuD3D10ResourceGetMappedSize  PFN_cuD3D10ResourceGetMappedSize_v3020
#define PFN_cuD3D10ResourceGetMappedPitch  PFN_cuD3D10ResourceGetMappedPitch_v3020
#define PFN_cuD3D10ResourceGetSurfaceDimensions  PFN_cuD3D10ResourceGetSurfaceDimensions_v3020


/**
 * Type definitions for functions defined in cudaD3D10.h
 */
typedef CUresult (CUDAAPI *PFN_cuD3D10GetDevice_v2010)(CUdevice_v1 *pCudaDevice, IDXGIAdapter *pAdapter);
typedef CUresult (CUDAAPI *PFN_cuD3D10GetDevices_v3020)(unsigned int *pCudaDeviceCount, CUdevice_v1 *pCudaDevices, unsigned int cudaDeviceCount, ID3D10Device *pD3D10Device, CUd3d10DeviceList deviceList);
typedef CUresult (CUDAAPI *PFN_cuGraphicsD3D10RegisterResource_v3000)(CUgraphicsResource *pCudaResource, ID3D10Resource *pD3DResource, unsigned int Flags);
typedef CUresult (CUDAAPI *PFN_cuD3D10CtxCreate_v3020)(CUcontext *pCtx, CUdevice_v1 *pCudaDevice, unsigned int Flags, ID3D10Device *pD3DDevice);
typedef CUresult (CUDAAPI *PFN_cuD3D10CtxCreateOnDevice_v3020)(CUcontext *pCtx, unsigned int flags, ID3D10Device *pD3DDevice, CUdevice_v1 cudaDevice);
typedef CUresult (CUDAAPI *PFN_cuD3D10GetDirect3DDevice_v3020)(ID3D10Device **ppD3DDevice);
typedef CUresult (CUDAAPI *PFN_cuD3D10RegisterResource_v2010)(ID3D10Resource *pResource, unsigned int Flags);
typedef CUresult (CUDAAPI *PFN_cuD3D10UnregisterResource_v2010)(ID3D10Resource *pResource);
typedef CUresult (CUDAAPI *PFN_cuD3D10MapResources_v2010)(unsigned int count, ID3D10Resource **ppResources);
typedef CUresult (CUDAAPI *PFN_cuD3D10UnmapResources_v2010)(unsigned int count, ID3D10Resource **ppResources);
typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceSetMapFlags_v2010)(ID3D10Resource *pResource, unsigned int Flags);
typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceGetMappedArray_v2010)(CUarray *pArray, ID3D10Resource *pResource, unsigned int SubResource);
typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceGetMappedPointer_v3020)(CUdeviceptr_v2 *pDevPtr, ID3D10Resource *pResource, unsigned int SubResource);
typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceGetMappedSize_v3020)(size_t *pSize, ID3D10Resource *pResource, unsigned int SubResource);
typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceGetMappedPitch_v3020)(size_t *pPitch, size_t *pPitchSlice, ID3D10Resource *pResource, unsigned int SubResource);
typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceGetSurfaceDimensions_v3020)(size_t *pWidth, size_t *pHeight, size_t *pDepth, ID3D10Resource *pResource, unsigned int SubResource);

/*
 * Type definitions for older versioned functions in cudaD3D10.h
 */
#if defined(__CUDA_API_VERSION_INTERNAL)
    typedef CUresult (CUDAAPI *PFN_cuD3D10CtxCreate_v2010)(CUcontext *pCtx, CUdevice_v1 *pCudaDevice, unsigned int Flags, ID3D10Device *pD3DDevice);
    typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceGetMappedPitch_v2010)(unsigned int *pPitch, unsigned int *pPitchSlice, ID3D10Resource *pResource, unsigned int SubResource);
    typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceGetMappedPointer_v2010)(CUdeviceptr_v1 *pDevPtr, ID3D10Resource *pResource, unsigned int SubResource);
    typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceGetMappedSize_v2010)(unsigned int *pSize, ID3D10Resource *pResource, unsigned int SubResource);
    typedef CUresult (CUDAAPI *PFN_cuD3D10ResourceGetSurfaceDimensions_v2010)(unsigned int *pWidth, unsigned int *pHeight, unsigned int *pDepth, ID3D10Resource *pResource, unsigned int SubResource);
#endif

#ifdef __cplusplus
}
#endif // __cplusplus

#endif // file guard
