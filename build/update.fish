#!/usr/bin/fish

echo "The number of pages to scrape is hardcoded."

echo "Open https://api.github.com/search/repositories?q=openrndr+fork:true in your browser"
echo "and calculace ceil(total_count / 30) to find out the number of pages"

echo "After running this script run `node parse.js >../scraped.md` to update the list"

# GitHub limits how many queries you can make (10 max?)
# A workaround is to load the URL in the browser and save the json file
# manually.

for i in 1 2 3 4 5 6 7 8 9 10 11
	curl "https://api.github.com/search/repositories?q=openrndr+fork:true&page=$i" -o page$i.json
end

