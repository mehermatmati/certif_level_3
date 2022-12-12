import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, distinctUntilChanged, filter, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { CountryService } from 'src/app/core/services/contries.service';
import { Status } from 'src/app/shared/models/enums/status.enum';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZipcodeEntryComponent implements OnInit, OnDestroy {
  @Output()
  addLocationEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Input() getStatus$: Observable<Status> = new Observable();
  @Input() message: string | null = null;
  private _subject$ = new Subject<void>;

  @Input() countries : string[] = [];

  form : FormGroup = new FormGroup(
    {
      needle : new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      country : new FormControl(null, null),
    }
  )

  constructor(private _countryService: CountryService) {
  }

  ngOnInit(): void {
    this.getButtonStatusToResetForm();
  }

  addLocation(){
    this.addLocationEmitter.emit(+this.form.controls['needle'].value);
  }

  private getButtonStatusToResetForm(){
    this.getStatus$.pipe(
      filter(status => status == Status.Initial || status == Status.Done),
      takeUntil(this._subject$)
      )
    .subscribe(() => {
        this.form.reset();
    })
  }

  ngOnDestroy(): void {
    this._subject$.next();
    this._subject$.complete();
  }

}
