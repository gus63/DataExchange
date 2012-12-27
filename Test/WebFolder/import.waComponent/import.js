
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'import';
	// @endregion// @endlock
	$sources = this.sources;
	$sourcesVar = this.sourcesVar;
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var comboboxFormat = {};	// @combobox
	var textFieldFilename = {};	// @textField
	var buttonImportAndSave = {};	// @button
	var buttonVerifyImport = {};	// @button
	// @endregion// @endlock
	
	resetImport = function resetImport() {
		$$(getHtmlId('buttonImportAndSave')).disable();
		$sourcesVar.attributeMap = [];
		$sources.attributeMap.sync();						
		$$(getHtmlId('richTextVerifyResult')).setValue('');
		$$(getHtmlId('richTextVerifyResult')).setTextColor('red');
	}
	
	resetImport();
	// eventHandlers// @lock

	comboboxFormat.change = function comboboxFormat_change (event)// @startlock
	{// @endlock
		resetImport();
	};// @lock

	textFieldFilename.change = function textFieldFilename_change (event)// @startlock
	{// @endlock
		resetImport();
	};// @lock

	buttonImportAndSave.click = function buttonImportAndSave_click (event)// @startlock
	{// @endlock
		var f, n;
		
		f = $$(getHtmlId('comboboxFormat')).getValue();
		n = $$(getHtmlId('textFieldFilename')).getValue();

		dataExchange.importExecuteAsync(
			{
				onSuccess: function(event) {
					console.log(event);
					if (event.success) {
						$$(getHtmlId('richTextVerifyResult')).setTextColor('green');
					}
					else {
						$$(getHtmlId('richTextVerifyResult')).setTextColor('red');
					}
					$$(getHtmlId('richTextVerifyResult')).setValue(event.message);
				},
				onError: function(error) {
					console.log(error);
				},
				params: [ {format: f, filename: n, attributeMap: $sourcesVar.attributeMap} ]
			}
		);
	};// @lock

	buttonVerifyImport.click = function buttonVerifyImport_click (event)// @startlock
	{// @endlock
		var f, n;
		
		f = $$(getHtmlId('comboboxFormat')).getValue();
		n = $$(getHtmlId('textFieldFilename')).getValue();

		dataExchange.importVerifyAsync(
			{
				onSuccess: function(event) {
					console.log(event);
					if (event.success) {
						$sourcesVar.attributeMap = event.attributeMap;
						$sources.attributeMap.sync();						
						$$(getHtmlId('richTextVerifyResult')).setTextColor('green');
						$$(getHtmlId('buttonImportAndSave')).enable();
					}
					else {
						resetImport();
					}
					$$(getHtmlId('richTextVerifyResult')).setValue(event.message);
				},
				onError: function(error) {
					console.log(error);
				},
				params: [ {format: f, filename: n} ]
			}
		);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_comboboxFormat", "change", comboboxFormat.change, "WAF");
	WAF.addListener(this.id + "_textFieldFilename", "change", textFieldFilename.change, "WAF");
	WAF.addListener(this.id + "_buttonImportAndSave", "click", buttonImportAndSave.click, "WAF");
	WAF.addListener(this.id + "_buttonVerifyImport", "click", buttonVerifyImport.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
