function mx = dilate_opencl(cim,halfSize)
	[sx,sy]=size(cim);
	
	mx=zeros(sx,sy);

	%acc parallel loop copyin(sx, sy, readonly cim, halfSize) copyout(mx)
	for a=1:sx
		%acc loop
		for b=1:sy
			if ~(a <= halfSize || a > sx - halfSize || b <= halfSize || b > sy - halfSize)
				m = 0;
				for ai = a-halfSize:a+halfSize
					for bi = b-halfSize:b+halfSize
						elem = cim(ai, bi);
						if elem > m
							m = elem;
						end
					end
				end
				mx(a,b) = m;
			end
			%p_elements = p(:);
			%mx(a,b)=max(p_elements);
		end
		%acc end
	end
	%acc end

end
