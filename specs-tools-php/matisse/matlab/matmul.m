%!assume_indices_in_range
function Y = matmul(A, B)
	%!parallel
	Y = zeros(size(A, 1), size(B, 2), 'single');

	for x = 1 : size(B, 2)
		for y = 1: size(A, 1)
			acc = single(0);
			
			for pos = 1 : size(A, 2)
				acc = acc + A(y, pos) * B(pos, x);
			end
			
			Y(y, x) = acc;
		end
	end
	%!end
end
