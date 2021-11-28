Feature: Inventory Feature
    @smoke
    Scenario Outline: Demo Inventory App.
        Given Login into inventory web app
        # Then Inventory page should list <NumberOfProducts>
        # Then Validate all products have valid price


        Examples:
            | TestID    | NumberOfProducts |
            | INV_TC001 | 6                |
