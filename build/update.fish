#!/usr/bin/fish

for i in 1 2 3 4 5 6 7 8
	curl "https://api.github.com/search/repositories?q=openrndr+fork:true&page=$i" -o page$i.json
end

echo "The number of pages to scrape is hardcoded."
echo "Open https://api.github.com/search/repositories?q=openrndr+fork:true in your browser"
echo "and calculace ceil(total_count / 30) to find out the number of pages"
echo "After running this script run `node parse.js >../README.md` to update the list"

