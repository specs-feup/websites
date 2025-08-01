function y = need_for_byref_test()
   y = zeros(1, 20);
   for i = 1:20,
      y(i) = aux_func(i);
   end
end


%!assume_indices_in_range
function result = aux_func(value)
   aux = zeros(1, 100);

   for i = 1:100,
      aux(i) = i * value > 10;
   end
   
   result = find(aux);
end