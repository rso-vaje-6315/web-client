import { NgModule } from "@angular/core";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

@NgModule({
    imports: [
        FontAwesomeModule
    ],
    exports: [
        FontAwesomeModule
    ]
})
export class IconsModule {

    constructor(library: FaIconLibrary) {
        library.addIcons(
            faPlus,
            faTimes,
            faCheck
        );
    }

}
