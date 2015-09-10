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

function getDummyItems(count) {
	var data = [];

	for (var i = 0; i < count; i++)
	{
		data.push(getDummyItem());
	}

	return data;
}


// --- Plain array ---
test('one item rendered when data is plain array of one object', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = [
		getDummyItem()
	];

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 1);
});

test('three items rendered when data is plain array of three objects', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = getDummyItems(3);

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 3);
});


// --- Ember array ---
test('item added to data is added to grid when data is Ember array', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = Ember.A([
		getDummyItem()
	]);

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 1);

	Ember.run(() => {
		data.addObject(getDummyItem());
	});
	expectElement(".row", 2);
});

test('item removed from data is removed from grid when data is Ember array', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = Ember.A(getDummyItems(2));

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 2);

	Ember.run(() => {
		data.removeObject(data[0]);
	});
	expectElement(".row", 1);
});

test('items added to data are added to grid when data is Ember array', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = Ember.A([
		getDummyItem()
	]);

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 1);

	Ember.run(() => {
		data.addObjects(getDummyItems(2));
	});
	expectElement(".row", 3);
});

test('items removed from data are removed from grid when data is Ember array', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = Ember.A(getDummyItems(3));

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 3);

	Ember.run(() => {
		data.removeObjects([data[0], data[1]]);
	});
	expectElement(".row", 1);
});

test('item pushed to data is added to grid when data is Ember array', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = Ember.A([
		getDummyItem()
	]);

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 1);

	Ember.run(() => {
		data.pushObject(getDummyItem());
	});
	expectElement(".row", 2);
});

test('item popped from data is removed from grid when data is Ember array', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = Ember.A(getDummyItems(2));

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 2);

	Ember.run(() => {
		data.popObject();
	});
	expectElement(".row", 1);
});

test('items pushed to data are added to grid when data is Ember array', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var data = Ember.A([
		getDummyItem()
	]);

	renderTemplate(this, {width, height, data, columns});
	expectElement(".row", 1);

	Ember.run(() => {
		data.pushObjects(getDummyItems(2));
	});
	expectElement(".row", 3);
});


// --- Promise -> plain array ---
test('one item rendered after resolution when data is promise resolving to plain array of one object', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var internalData = [
		getDummyItem()
	];

	var resolvePromise;
	var dataPromise = new Ember.RSVP.Promise(function (resolve) {
		resolvePromise = resolve;
	});

	renderTemplate(this, {width, height, data: dataPromise, columns});
	expectElement(".row", 0);

	Ember.run(() => {
		resolvePromise(internalData);
	});
	expectElement(".row", 1);
});


// --- Promise -> Ember array ---
test('one item rendered after resolution when data is promise resolving to Ember array of one object', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var internalData = Ember.A([
		getDummyItem()
	]);

	var resolvePromise;
	var dataPromise = new Ember.RSVP.Promise(function (resolve) {
		resolvePromise = resolve;
	});

	renderTemplate(this, {width, height, data: dataPromise, columns});
	expectElement(".row", 0);

	Ember.run(() => {
		resolvePromise(internalData);
	});
	expectElement(".row", 1);
});

test('three items rendered after resolution when data is promise resolving to Ember array of one object then two objects added', function() {
	var width = 500;
	var height = 200;
	var columns = columnsWithWidths;
	var internalData = Ember.A([
		getDummyItem()
	]);

	var resolvePromise;
	var dataPromise = new Ember.RSVP.Promise(function (resolve) {
		resolvePromise = resolve;
	});

	renderTemplate(this, {width, height, data: dataPromise, columns});
	expectElement(".row", 0);

	Ember.run(() => {
		resolvePromise(internalData);
	});
	expectElement(".row", 1);

	Ember.run(() => {
		internalData.addObjects(getDummyItems(2));
	});
	expectElement(".row", 3);
});
