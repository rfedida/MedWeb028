/// <reference types="angular" />
/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */
import { IDirective, IParseService } from 'angular';
/**
 * One-way data binds the $columns array generated by ngTable/ngTableDynamic to the specified
 * expression.
 * This allows the $columns array created for the table to be accessed outside of the html table
 * markup.
 *
 * @ngdoc directive
 *
 * @example
 * ```html
 * <table ng-table="$ctrl.tableParams" class="table" ng-table-columns-binding="$ctlr.tableColumns">
 * ```
 */
export declare function ngTableColumnsBinding<T>($parse: IParseService): IDirective;