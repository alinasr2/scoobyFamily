import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderBlogComponent } from './slider-blog.component';

describe('SliderBlogComponent', () => {
  let component: SliderBlogComponent;
  let fixture: ComponentFixture<SliderBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
