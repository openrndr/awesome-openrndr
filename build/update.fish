#!/usr/bin/fish

for i in 1 2 3 4 5 6
	curl "https://api.github.com/search/repositories?q=openrndr+fork:true&page=$i" -o page$i.json
end

