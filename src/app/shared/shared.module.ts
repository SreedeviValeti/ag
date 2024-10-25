import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { InlineLoaderComponent } from './components/inline-loader/inline-loader.component';
import { AsyncLoaderComponent } from './components/async-loader/async-loader.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KeysPipe } from './pipes/keys.pipe';
import { SafePipe } from './pipes/safe.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    KeysPipe,
    SafePipe,
    ClickOutsideDirective,
    AsyncLoaderComponent,
    InlineLoaderComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    KeysPipe,
    SafePipe,
    ClickOutsideDirective,
    AsyncLoaderComponent,
    InlineLoaderComponent
  ]

})
export class SharedModule { }
