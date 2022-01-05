Feature: Inventory Feature

    Scenario Outline: <TestID>: Demo Inventory App.
        # Given Login into inventory web app
        Given As a standard user I login to inventory web app
        Then Inventory page should list <NumberOfProducts>
        Then Validate all products have valid price


        Examples:
            | TestID    | NumberOfProducts |
            | INV_TC001 | 6                |
