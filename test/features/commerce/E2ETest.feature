Feature: E2E Test Commerce Feature
    @demo
    Scenario Outline: <TestID>: E2ETest Commerce App (Search External Customer).

        Given Get a list of users from reques.in
        When As an Admin User login to nopcommerce site
        Then Verify if all users exist in customer list


        Examples:
            | TestID    |
            | E2E_TC001 |
