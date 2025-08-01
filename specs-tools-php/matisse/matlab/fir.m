function output=fir(input, coef)
	NTAPS = length(coef);
	N = length(input);
	output = zeros(1, N);

	for i = NTAPS:1:N
			sum = 0;
			for j = 0:1:NTAPS-1
				sum = sum + input(i-j) * coef (j+1);
			end 
			output(i) = sum;
	end
end
