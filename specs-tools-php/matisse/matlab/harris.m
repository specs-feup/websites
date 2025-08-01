function [cim, r, c, rsubp, csubp] = harris(im, sigma, thresh, radius, disp)
   % Compute derivatives and elements of the structure tensor.
   [Ix, Iy] = derivative5(im,  'x' ,  'y' );
   Ix2 = gaussfilt(Ix.^2, sigma);
   Iy2 = gaussfilt(Iy.^2, sigma);
   Ixy = gaussfilt(Ix.*Iy, sigma);
   % Compute the Harris corner measure. Note that there are two measures
   % ….
   
   cim = ((Ix2.*Iy2-Ixy.^2)./(Ix2+Iy2+eps));

	%@second
[r,c] = nonmaxsuppts(cim, radius, thresh);
