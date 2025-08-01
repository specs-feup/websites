#ifndef CUDAD3D11TYPEDEFS_H
#define CUDAD3D11TYPEDEFS_H

// Dependent includes for cudaD3D11.h
#include <rpcsal.h>
#include <D3D11_1.h>

#include <cudaD3D11.h>

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

/*
 * Macros for the latest version for each driver function in cudaD3D11.h
 */
#define PFN_cuD3D11GetDevice  PFN_cuD3D11GetDevice_v3000
#define PFN_cuD3D11GetDevices  PFN_cuD3D11GetDevices_v3020
#define PFN_cuGraphicsD3D11RegisterResource  PFN_cuGraphicsD3D11RegisterResource_v3000
#define PFN_cuD3D11CtxCreate  PFN_cuD3D11CtxCreate_v3020
#define PFN_cuD3D11CtxCreateOnDevice  PFN_cuD3D11CtxCreateOnDevice_v3020
#define PFN_cuD3D11GetDirect3DDevice  PFN_cuD3D11GetDirect3DDevice_v3020


/**
 * Type definitions for functions defined in cudaD3D11.h
 */
typedef CUresult (CUDAAPI *PFN_cuD3D11GetDevice_v3000)(CUdevice_v1 *pCudaDevice, IDXGIAdapter *pAdapter);
typedef CUresult (CUDAAPI *PFN_cuD3D11GetDevices_v3020)(unsigned int *pCudaDeviceCount, CUdevice_v1 *pCudaDevices, unsigned int cudaDeviceCount, ID3D11Device *pD3D11Device, CUd3d11DeviceList deviceList);
typedef CUresult (CUDAAPI *PFN_cuGraphicsD3D11RegisterResource_v3000)(CUgraphicsResource *pCudaResource, ID3D11Resource *pD3DResource, unsigned int Flags);
typedef CUresult (CUDAAPI *PFN_cuD3D11CtxCreate_v3020)(CUcontext *pCtx, CUdevice_v1 *pCudaDevice, unsigned int Flags, ID3D11Device *pD3DDevice);
typedef CUresult (CUDAAPI *PFN_cuD3D11CtxCreateOnDevice_v3020)(CUcontext *pCtx, unsigned int flags, ID3D11Device *pD3DDevice, CUdevice_v1 cudaDevice);
typedef CUresult (CUDAAPI *PFN_cuD3D11GetDirect3DDevice_v3020)(ID3D11Device **ppD3DDevice);

#if defined(__CUDA_API_VERSION_INTERNAL)
    typedef CUresult (CUDAAPI *PFN_cuD3D11CtxCreate_v3000)(CUcontext *pCtx, CUdevice_v1 *pCudaDevice, unsigned int Flags, ID3D11Device *pD3DDevice);
#endif

#ifdef __cplusplus
}
#endif // __cplusplus

#endif // file guard
