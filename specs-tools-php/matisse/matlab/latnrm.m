function [outa] = latnrm(data, coefficient, internal_state, NPOINTS, ORDER)
% data:            input sample array
% outa:            output sample array
% coefficient:     coefficient array
% internal_state:  internal state array


  bottom=0;

  for i = 1:1:NPOINTS
    top = data(i);
    for j = 2:1:ORDER
      left = top;
      right = internal_state(j);
      internal_state(j) = bottom;
      top = coefficient(j-1) * left - coefficient(j) * right;
      bottom = coefficient(j-1) * right + coefficient(j) * left;
    end

    internal_state(ORDER-1) = bottom;
    internal_state(ORDER) = top;
    sum = 0.0;

    for j = 1:1:ORDER
      sum = sum + internal_state(j) * coefficient(j+ORDER);
    end

    outa(i) = sum;
  end