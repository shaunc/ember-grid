import { test } from '../../helpers/chai-assert';
import moduleForIntegration from '../../helpers/test-component';
import { columnsWithWidths } from '../../helpers/example-data';
import { renderTemplate } from '../../helpers/render';

moduleForIntegration("spec/supplying-data/ember-data-models-test",
					 "Data Source | supply data using ember-data models");

function getDummyItem() {
	return {
		get: function(key) {
			if (key === "name") {
				return "name";
			} else if (key === "age") {
				return 12;
			} else if (key === "salary") {
				return 123;
			} else if (key === "email") {
				return "email";
			}
		}
	};
}

function getDummyItems(count) {
	var data = [];

	for (var i = 0; i < count; i++)
	{
		data.push(getDummyItem());
	}

	return data;
}

test('column renders field by key when data is one ember-data model', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = getDummyItems(1);

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 1, {contains: "name"});
});

test('column renders field by field name when data is one ember-data model', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = getDummyItems(1);

	// specify a field on the column which overrides key
	columns.forEach(col => {
		col.field = col.key;
	});

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 1, {contains: "name"});
});
