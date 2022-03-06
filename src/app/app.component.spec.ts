import { APP_BASE_HREF } from '@angular/common';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [AppModule],
    declareComponent: false,
    providers: [
      {
        provide: APP_BASE_HREF,
        useValue: '',
      },
    ],
  });
  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should only show the app ticker if a value has been submitted', () => {
    // Arrange
    expect(spectator.query('app-ticker')).not.toBeVisible();

    // Act
    spectator.typeInElement('test', 'input');
    spectator.click('button');
    spectator.detectChanges();

    // Assert
    expect(spectator.component.symbol).toBeDefined();
    expect(spectator.query('app-ticker')).toBeVisible();
  });
});
