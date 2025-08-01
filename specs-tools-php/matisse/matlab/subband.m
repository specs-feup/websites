%-----------------------------------------------
% Implements a polyphase filter bank used in
% MPEG audio compression
function s = subband(z, m)

	y = zeros(1,64);
	s = zeros(1,32);

	for i = 1:64
	
        acc1 = 0;
		
		for j = 0:7
		
			acc1 = acc1 + z(i+64*j);
        end
		
        y(i) = acc1;
	end

	
	for i = 0:31
	
        acc2 = 0;
		
		for j = 1:64
		
			acc2 = acc2 + m(i*32 + j) * y(j);
        end
		
        s(i+1) = acc2;     
	end
end
