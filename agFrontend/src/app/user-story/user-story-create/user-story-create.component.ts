import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStoryService } from 'src/app/user-story/service/user-story.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/models/sprint';

@Component({
  selector: 'app-user-story-create',
  templateUrl: './user-story-create.component.html'
})
export class UserStoryCreateComponent implements OnInit {
  createForm: FormGroup;
  loading: boolean = false;
  submittedLoading: boolean = false;
  submitted: boolean = false;
  sprints: Sprint[];

  // Input
  @Input() sprintId: number;
  @Input() projectId: number;

  // Output
  @Output() userStoryCreated: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private userStoryService: UserStoryService,
    public activeModal: NgbActiveModal,
    private sprintService: SprintService) { }

  ngOnInit() {
    // Start Loading
    this.loading = true;

    this.sprintService.getAllByProject(this.projectId).subscribe(sprints => {
      this.sprints = sprints;

      this.createForm = this.formBuilder.group({
        name: ['', Validators.required],
        sprintId: [this.sprintId, Validators.required]
      });

      // End loading
      this.loading = false;
    }, error => {
      alert(error);
      this.loading = false;
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    // Start Submitted Loading
    this.submittedLoading = true;
    this.userStoryService.create(this.createForm.value).pipe(first()).subscribe(
      data => {
        this.activeModal.close();
        this.userStoryCreated.emit();
      },
      error => {
        // End Submitted Loading 
        this.submittedLoading = false;
        alert(error);
      }
    )
  }

}
