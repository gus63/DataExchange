
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var comboboxMode = {};	// @combobox
// @endregion// @endlock

// eventHandlers// @lock

	comboboxMode.change = function comboboxMode_change (event)// @startlock
	{// @endlock
		switch (this.getValue()) {
			case 'import':
				$$('componentExport').removeComponent();
				$$('componentImport').loadComponent('import.waComponent');
				break;
			case 'export':
				$$('componentImport').removeComponent();
				$$('componentExport').loadComponent('export.waComponent');
				break;
			default:
				$$('componentImport').removeComponent();
				$$('componentExport').removeComponent();
				break;
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("comboboxMode", "change", comboboxMode.change, "WAF");
// @endregion
};// @endlock
