'use strict';
import Em from 'ember';

/**
 * Foo data type
 * @class  Foo
 * @module test-foo
 */
export default Em.Object.extend({
	/**
	 * @property {String} barName an instance of a bar
	 * @type {String}
	 * @default  null
	 */
	barName: null,
	/**
	 * a bletch
	 * @property {Bletch} bletch
	 * @type {Bletch}
	 */
	bletch: null,
	/**
	 * Clears all bars
	 * @method  clear
	 * @return {Foo} an empty foo
	 */
	clear: function() {
		this.set('barName', null);
		return this;
	},
	/**

	answer the first known bar name
    @property firstObject
    @return {String} the first bar or undefined
  */
  firstObject: function() {
    return this.get('barName');
  }.property('bletch'),
  /**
   * bad property
   * no type
   * should result in warning
   */
   bad: null,
   /**
   * bad (no name) property
   * no type
   * should result in warning
   * @property {String}
   */
   badNoName: null
});
