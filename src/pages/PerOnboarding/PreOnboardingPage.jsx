import React, { useState } from "react";
import ButtonComponent from "../../reuseableComponents/ButtonComponent";
import PersonalDetail from "./PersonalDetail";
import CareerDetail from "./CareerDetail";
import FamilyDetail from "./FamilyDetail";
import EducationDetail from "./EducationDetail";
import DocumentDetail from "./DocumentDetail";

function PreOnboardingPage() {
  const steps = ["Personal Details", "Career", "Education", "Family", "Documents"];
  const [activeSteps, setActiveSteps] = useState(0)
  const onclickNextButton = () => {
    if (activeSteps < steps.length - 1) {
      setActiveSteps(activeSteps + 1);
    }
  };

  const onclickPerviousButton = () => {
    if (activeSteps > 0) {
      setActiveSteps(activeSteps - 1);
    }
  };

  return (
    <main className="pre-onboarding-page">
      <section className="pre-onboarding-card">
        <div className="pre-onboarding-progress">
          <div className="pre-onboarding-steps">
            {steps.map((step, index) => (
              <div
                className={`pre-onboarding-step
                  ${index === activeSteps ? " active" : ""}
                  ${index < activeSteps ? " completed" : ""}
                `}
                key={step}
              >
                <span>
                  {index < activeSteps ? "✓" : index + 1}
                </span>

                <small>{step}</small>
              </div>
            ))}
          </div>
          <div className="pre-onboarding-progress-row">
            <div className="pre-onboarding-progress-track">
              <span
                style={{
                  width: `${(activeSteps / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            <small>
              {Math.round(
                (activeSteps / (steps.length - 1)) * 100
              )}
              %
            </small>


          </div>
        </div>
        <div className="pre-onboarding-content">

          {activeSteps === 0 && <PersonalDetail />}

          {activeSteps === 1 && (
            <CareerDetail />
          )}

          {activeSteps === 2 && (
            <EducationDetail />
          )}

          {activeSteps === 3 && (
            <FamilyDetail />
          )}

          {activeSteps === 4 && (
            <DocumentDetail />
          )}
        </div>




        <div className="pre-onboarding-actions">
          <ButtonComponent
            btnbackground="#FFFFFF"
            variant="outlined"
            onclickButton={() => { onclickPerviousButton(activeSteps) }}
            isDisabled={activeSteps === 0}
          >
            Previous
          </ButtonComponent>
          <ButtonComponent
            type="button"
            className="pre-onboarding-next"
            btnbackground="#2F80D7"
            onclickButton={() => { onclickNextButton(activeSteps) }}
          >
            {activeSteps === steps.length - 1 ? "Submit" : "Next"}
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
}

export default PreOnboardingPage
