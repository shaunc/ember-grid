import { test } from '../../helpers/chai-assert';
import moduleForIntegration from '../../helpers/test-component';
import { columnsWithWidths } from '../../helpers/example-data';
import { renderTemplate } from '../../helpers/render';
import Ember from 'ember';

moduleForIntegration("spec/supplying-data/array-update-test",
					 "supply data using different kinds of array");

function getDummyItem() {
	return {
		name: "name",
		age: 12,
		salary: 123,
		email: "email"
	};
}

function getDummyData(count) {
	var data = [];

	for (var i = 0; i < count; i++)
	{
		data.push(getDummyItem());
	}

	return data;
}

test('item added to data is added to grid when data is Ember array', function() {
	var width = 400;
	var height = 800;
	var columns = columnsWithWidths;
	var data = Ember.A([
		getDummyItem()
	]);

	renderTemplate(this, {width, height, data, columns});
	andThen(() => {
		expectElement(".row", 1);

		Ember.run(() => {
			data.addObject(getDummyItem());
		});
		andThen(() => {
			expectElement(".row", 2);
		});
	});
});

test('item removed from data is removed from grid when data is Ember array', function() {
	var width = 400;
	var height = 800;
	var columns = columnsWithWidths;
	var data = Ember.A(getDummyData(2));

	renderTemplate(this, {width, height, data, columns});
	andThen(() => {
		expectElement(".row", 2);

		Ember.run(() => {
			data.removeObject(data[0]);
		});
		andThen(() => {
			expectElement(".row", 1);
		});
	});
});

test('item pushed to data is added to grid when data is Ember array', function() {
	var width = 400;
	var height = 800;
	var columns = columnsWithWidths;
	var data = Ember.A([
		getDummyItem()
	]);

	renderTemplate(this, {width, height, data, columns});
	andThen(() => {
		expectElement(".row", 1);

		Ember.run(() => {
			data.pushObject(getDummyItem());
		});
		andThen(() => {
			expectElement(".row", 2);
		});
	});
});

test('item popped from data is removed from grid when data is Ember array', function() {
	var width = 400;
	var height = 800;
	var columns = columnsWithWidths;
	var data = Ember.A(getDummyData(2));

	renderTemplate(this, {width, height, data, columns});
	andThen(() => {
		expectElement(".row", 2);

		Ember.run(() => {
			data.popObject();
		});
		andThen(() => {
			expectElement(".row", 1);
		});
	});
});
