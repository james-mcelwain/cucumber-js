Feature: Dryrun mode

  Using the `--dry-run` or `-d` flag gives you a way to quickly scan your features without actually running them.

  Background:
    Given a file named "features/a.feature" with:
      """
      Feature: Missing
        Scenario: Missing
          Given this step passes
      """

  Scenario: Skipped scenario with defined step with --dry-run
    Given a file named "features/step_definitions/cucumber_steps.js" with:
      """
      var cucumberSteps = function() {
        this.When('this step passes', function(callback) { callback(); });
      };
      module.exports = cucumberSteps;
      """
    When I run cucumber.js with `-f progress features/a.feature --dry-run`
    Then it outputs this text:
      """
      -

      1 scenario (1 skipped)
      1 step (1 skipped)
      <duration-stat>
      """
    And the exit status should be 0

  Scenario: Skipped scenario with defined step with --dry-run --strict
    Given a file named "features/step_definitions/cucumber_steps.js" with:
      """
      var cucumberSteps = function() {
        this.When('this step passes', function(callback) { callback(); });
      };
      module.exports = cucumberSteps;
      """
    When I run cucumber.js with `-f progress features/a.feature --dry-run --strict`
    Then it outputs this text:
      """
      -

      1 scenario (1 skipped)
      1 step (1 skipped)
      <duration-stat>
      """
    And the exit status should be 0

  Scenario: Undefined scenario with undefined step with --dry-run --strict
    When I run cucumber.js with `-f progress features/a.feature --dry-run --strict`
    Then it outputs this text:
      """
      U

      Warnings:

      1) Scenario: Missing - features/a.feature:2
         Step: Given this step passes - features/a.feature:3
         Message:
           Undefined. Implement with the following snippet:

             this.Given('this step passes', function (callback) {
               // Write code here that turns the phrase above into concrete actions
               callback(null, 'pending');
             });

      1 scenario (1 undefined)
      1 step (1 undefined)
      <duration-stat>
      """
    And the exit status should be 1

  Scenario: Skipped scenario with undefined step with --dry-run
    When I run cucumber.js with `-f progress features/a.feature --dry-run`
    Then it outputs this text:
      """
      U

      Warnings:

      1) Scenario: Missing - features/a.feature:2
         Step: Given this step passes - features/a.feature:3
         Message:
           Undefined. Implement with the following snippet:

             this.Given('this step passes', function (callback) {
               // Write code here that turns the phrase above into concrete actions
               callback(null, 'pending');
             });

      1 scenario (1 undefined)
      1 step (1 undefined)
      <duration-stat>
      """
    And the exit status should be 0

  Scenario: Skipped scenario with defined step with -d
    Given a file named "features/step_definitions/cucumber_steps.js" with:
      """
      var cucumberSteps = function() {
        this.When('this step passes', function(callback) { callback(); });
      };
      module.exports = cucumberSteps;
      """
    When I run cucumber.js with `-f progress features/a.feature -d`
    Then it outputs this text:
      """
      -

      1 scenario (1 skipped)
      1 step (1 skipped)
      <duration-stat>
      """
    And the exit status should be 0
