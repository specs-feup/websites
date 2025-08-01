function C = mult()

    % Initialization
    for i=1:numel(A)
        A(i) = i;
    end

    for i=1:numel(B)
        B(i) = i+1;
    end

    C = mult_helper(A, B);

end

function C = mult_helper(A, B)

    C = A*B;

end
