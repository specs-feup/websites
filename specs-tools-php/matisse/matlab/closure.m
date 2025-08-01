
function [B_out] = closure(B)
%-----------------------------------------------------------------------
%
%    This function M-file computes the transitive closure of a
%	directed graph. An adjacency matrix representation of the
%	directed graph is used, which is initialized arbitrarily.
%
%	Invocation:
%		>> [B_out] = closure(B)
%
%		where
%
%		i. B is a square matrix with a power of two size, representing the directed graph,
%
%		o. B_out is the transitive closure.
%
%	Requirements:
%		B is a square matrix with a power of two size
%
%	Source:
%		Quinn's "Otter" project.
%
%	Author:
%		Yan Zhao (zhao@cs.orst.edu).
%       modified by Joao Bispo (jbispo@fe.up.pt).
%
%	Date:
%		July 1997.
%
%-----------------------------------------------------------------------


N = size(B, 1);
% This division will always be an integer division
ii = N/2;
while ii >= 1,
      B = B*B;
	  % This division also
      ii = ii/2;
end;

B_out = B > 0;


