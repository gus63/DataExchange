
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'export';
	// @endregion// @endlock

	var $sources = this.sources;
	var $sourcesVar = this.sourcesVar;
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonExport = {};	// @button
	var buttonExportFromPreview = {};	// @button
	var buttonCancelPreview = {};	// @button
	var buttonPreview = {};	// @button
	// @endregion// @endlock
	$sourcesVar.classes = [];
	Object.keys(ds.getDataClasses()).forEach(
		function(e) {
			$sourcesVar.classes.push( {name: e} );
		}
	);
	$sources.classes.sync();
	
	function exportClasses() {
		var c = [], f, n;
		
		$$(getHtmlId('dataGridClasses')).getSelectedRows().forEach(
			function(e) {
				c.push($sourcesVar.classes[e].name);
			}
		);	
		f = $$(getHtmlId('comboboxFormat')).getValue();
		n = $$(getHtmlId('textFieldFilename')).getValue();

		dataExchange.exportClassesAsync(
			{
				onSuccess: function(event) {
					console.log(event);
					$$(getHtmlId('dialogPreview')).closeDialog(); //export button
					if (event.success) {
						$$(getHtmlId('richTextExportResult')).setValue(event.message); //export button
					}
					else {
						$$(getHtmlId('richTextExportResult')).setValue('Export failed! ' + event.message); //export button
					}
				},
				onError: function(error) {
					console.log(error);
				},
				params: [ {classes: c, format: f, filename: n} ]
			}
		);
	}
	
	// eventHandlers// @lock

	buttonExport.click = function buttonExport_click (event)// @startlock
	{// @endlock
		exportClasses();
	};// @lock

	buttonExportFromPreview.click = function buttonExportFromPreview_click (event)// @startlock
	{// @endlock
		exportClasses();
	};// @lock

	buttonCancelPreview.click = function buttonCancelPreview_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('dialogPreview')).closeDialog(); //cancel button
	};// @lock

	buttonPreview.click = function buttonPreview_click (event)// @startlock
	{// @endlock
		var c = [], f, n;
		
		$$(getHtmlId('dataGridClasses')).getSelectedRows().forEach(
			function(e) {
				c.push($sourcesVar.classes[e].name);
			}
		);	
		f = $$(getHtmlId('comboboxFormat')).getValue();
		n = $$(getHtmlId('textFieldFilename')).getValue();

		dataExchange.exportPreviewAsync(
			{
				onSuccess: function(event) {
					$$(getHtmlId('richTextPreviewText')).setValue(event);
					$$(getHtmlId('dialogPreview')).displayDialog(); //cancel button
				},
				onError: function(error) {
					console.log(error);
				},
				params: [ {classes: c, format: f, filename: n} ]
			}
		);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonExport", "click", buttonExport.click, "WAF");
	WAF.addListener(this.id + "_buttonExportFromPreview", "click", buttonExportFromPreview.click, "WAF");
	WAF.addListener(this.id + "_buttonCancelPreview", "click", buttonCancelPreview.click, "WAF");
	WAF.addListener(this.id + "_buttonPreview", "click", buttonPreview.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
