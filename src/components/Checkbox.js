import React from "react";
import red from "@material-ui/core/colors/red";
import Checkbox from "@material-ui/core/Checkbox";
import { ValidatorComponent } from "react-material-ui-form-validator";

const red300 = red["500"];

const styles = {
  errorText: { right: 0, fontSize: "12px", color: red300 },
  container: { display: "flex" },
  //   position: "absolute",
  //   marginTop: "-25px",
};

class CheckboxValidatorElement extends ValidatorComponent {
  render() {
    const {
      errorMessages,
      validators,
      requiredError,
      value,
      label,
      ...rest
    } = this.props;

    return (
      <>
        <div style={styles.container}>
          <Checkbox
            {...rest}
            ref={(r) => {
              this.input = r;
            }}
          />
          <p> {label} </p>
        </div>
        {this.errorText()}
      </>
    );
  }

  errorText() {
    const { isValid } = this.state;

    if (isValid) {
      return null;
    }

    return <div style={styles.errorText}>{this.getErrorMessage()}</div>;
  }
}

export default CheckboxValidatorElement;
