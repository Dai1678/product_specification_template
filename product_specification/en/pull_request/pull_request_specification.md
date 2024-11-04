# Pull Requests Feature Specification

## List of Screens Related to This Feature

| Screen Name | Functional Requirements | Figma Link |
|---|---|---|
| My Pull Request List Screen | ・Display a list of pull requests related to the user himself | [iOS]() [Android]() |
| Repository Pull Request List Screen | ・Display a list of pull requests related to the repository | [iOS]() [Android]() |
| Pull Request Detail Screen | ・Display and edit detailed information<br>・Preview code changes<br>・Pull request review<br>・Display commit history<br>・Display and post comments | [iOS]() [Android]() |

---

# Display a list of pull requests related to the user himself
## Screen Display Information

```mermaid
graph TD;
    A[Home Screen] -->|Screen Transition| B[Pull Request List Screen]
    B --> C[Retrieve List of Created Pull Requests]
    C --> D[Display List]
    D -->|Scroll| E[Display Next Page]
    D -->|Tap| F[Transition to Detail Screen]
    D -->|Change Filter/Sort| G[Create Shortcut]
    G --> H[Display on Home Screen]
```

### Input Information

| Item Name | Description | Data Format | Initial Value | Input Range/Constraints | Required/Optional |
|-----|----|-------|-----|---------|-------|
| Pull Request Status | Can filter by pull request status | ・Open<br>・Merged<br>・Closed<br>Pending<br>・All | Open | Select one from dropdown | Optional |
| Relationship with Pull Request | Can filter by the user's relationship to the pull request | ・Created by me<br>・Assigned to me<br>Mentioned me<br>Review request<br>Related | Created by me | Select one from dropdown | Optional |
| Visibility | Can filter by repository visibility | ・Show all<br>・Private repositories only<br>・Public repositories only | Show all | Select one from dropdown | Optional |
| Organization | Can filter by pull requests of specific organizations | List of organizations the user belongs to | Pull requests from all organizations and repositories not belonging to any organization | Multiple selections possible | Optional |
| Repository | Can filter by pull requests of the user's specific repositories | List of user's repositories | All repositories | Multiple selections possible<br>Filtered with OR condition with organization filter | Optional |
| Sorting Order | Set the sorting order of the pull request list | ・Newest or Oldest<br>・Most or Fewest comments<br>・Recently updated or Oldest updates<br>・Most reactions | Newest | Select only one condition | Optional |

### Domain Knowledge

<!--
If there are any term definitions necessary to understand the functional specifications, list them here in bullet points.
Consider creating a new page and linking them if they frequently appear in other functional specifications.
-->

None

### Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Mobile App
    participant Backend

    User ->> Mobile App: Open list screen
    Mobile App ->> Backend: Request pull request data for 30 items per page
    Backend -->> Mobile App: Return list of pull requests
    Mobile App ->> Mobile App: Display screen
    User ->> Mobile App: Set filters and sort settings
    Mobile App ->> Backend: Request pull list of pull requests again from page one with filters and sorting conditions
    Backend -->> Mobile App: Return list of pull requests
    Mobile App ->> Mobile App: Display list
```

### REST API Endpoints Used

<!--
List the REST API endpoints used by each system for this feature in bullet points.
-->

**iOS・Android**

- 

**{microservice}**

-

### GraphQL Queries and Mutations Used

<!--
List links to Github files of the GraphQL Queries and Mutations defined by the front end for this feature in bullet points.
-->

**iOS**

- 

**Android**

- 

---

# Related Information

## Related Requirement Documents

<!--
List URLs of requirement documents of projects that added or modified features for this functionality in bullet points.
-->

- []()

## Related Product Backlog Item・Issue

List URLs of Product Backlog Items and Issues that added or modified features for this functionality in bullet points.

- []()

## Other Functional Specifications Related to Screens in This Feature

<!--
Screens included in this feature may have other functionalities.
List links to the functional specifications of those functionalities in bullet points.
-->

- XX Screen
    - []()

## References

<!--
List URLs of other information related to this feature in bullet points.
-->

- []()