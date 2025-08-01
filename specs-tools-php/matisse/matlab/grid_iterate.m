%-----------------------------------------------
% Iterates the grid to get Laplacian solution
% for potential.
function v_old = grid_iterate(obstacle, v, iter_max, nx, ny, nz)

	v_0 = 0;
	v_end = 1;
	c = 1/6;

	for iter = 1:iter_max
		for i=2:nx-1
			for j=2:ny-1
				for k=2:nz-1
					if(obstacle(i,j,k)==1) %@if
						v(i,j,k) =  v_0;
					elseif(obstacle(i,j,k)==-1) %@elseif
						v(i,j,k) =  v_end;
					else %@else
						temp = 		v(i-1,j,k)+...
									v(i+1,j,k)+...
									v(i,j-1,k)+...
									v(i,j+1,k)+...
									v(i,j,k-1)+...
									v(i,j,k+1);
									
						v(i,j,k) = 	temp * c;
					end
				end
			end
		end
	end

	v_old = v;
end
