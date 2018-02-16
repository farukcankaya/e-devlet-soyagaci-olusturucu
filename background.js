chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
	if (request.open == "tree"){
		sendResponse({status: "ok"});
		var url = chrome.extension.getURL("tree.html?all_data="+JSON.stringify(request.all_data));
		chrome.tabs.create({url: url}) 
	}
});