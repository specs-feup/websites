#include <stdlib.h>
#include <stdio.h>
#include <omp.h>

static void foo(    int ni, int nj, int nk, int nl,
                    double alpha,
                    double beta,
                    double tmp[( 1024)][( 1024)],
                    double A[( 1024)][( 1024)],
                    double B[( 1024)][( 1024)],
                    double C[( 1024)][( 1024)],
                    double D[( 1024)][( 1024)])
{
    int i, j, k;

    #pragma omp parallel
    {
        #pragma omp for private (j, k)
        for ( i = 0; i < ni; i++ )
            for ( j = 0; j < nj; j++ ) {
                tmp[i][j] = 0;
                for ( k = 0; k < nk; ++k ) {
                    tmp[i][j] += alpha * A[i][k] * B[k][j];
                }
            }
        #pragma omp for private (j, k)
        for ( i = 0; i < ni; i++ )
            for ( j = 0; j < nl; j++ ) {
                D[i][j] *= beta;
                for ( k = 0; k < nj; ++k ) {
                    D[i][j] += tmp[i][k] * C[k][j];
                }
            }
    }
}


int main( int argc, char** argv )
{
    int ni = 1024;
    int nj = 1024;
    int nk = 1024;
    int nl = 1024;

    double alpha;
    double beta;
    double ( * tmp )[( 1024)][( 1024)];
    double ( * A )[( 1024)][( 1024)];
    double ( * B )[( 1024)][( 1024)];
    double ( * C )[( 1024)][( 1024)];
    double ( * D )[( 1024)][( 1024)];
    
    tmp = ( double ( * )[( 1024)][( 1024)] )    malloc(   1024 *  1024  * sizeof ( double ) ) ;
    A =  ( double ( * )[( 1024)][( 1024)] )     malloc(   1024 *  1024  * sizeof ( double ) ) ;
    B =  ( double ( * )[( 1024)][( 1024)] )     malloc(   1024 *  1024  * sizeof ( double ) ) ;
    C =  ( double ( * )[( 1024)][( 1024)] )     malloc(   1024 *  1024  * sizeof ( double ) ) ;
    D =  ( double ( * )[( 1024)][( 1024)] )     malloc(   1024 *  1024  * sizeof ( double ) ) ;
    
    /* kernel */
    foo ( ni, nj, nk, nl, alpha, beta, ( * tmp ), ( * A ), ( * B ), ( * C ), ( * D ) );


    free(  tmp  );
    free(  A ) ;
    free(  B ) ;
    free(  C ) ;
    free(  D ) ;

    return 0;
}
