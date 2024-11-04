# Pull Requests Feature Specification

## List of Screens Related to This Functionality

| Screen Name | Functional Requirements | Figma Link |
|---|---|---|
| My Tasks Pull Request List Screen | ・Display a list of Pull Requests related to the user | [iOS]() [Android]() |
| Repository Pull Request List Screen | ・Display a list of Pull Requests related to the repository | [iOS]() [Android]() |
| Pull Request Detail Screen | ・Display and edit detailed information<br>・Code change preview<br>・Pull Request review<br>・Show commit history<br>・Display and post comments | [iOS]() [Android]() |

---
# Display List of Pull Requests Related to the User
## Screen Display Information

```mermaid
graph TD;
    A[Home Screen] -->|Screen Transition| B[Pull Request List Screen]
    B --> C[Retrieve List of Pull Requests Created by Me]
    C --> D[Display List]
    D -->|Scroll| E[Display Next Page]
    D -->|Tap| F[Transition to Detail Screen]
    D -->|Filter/Sort Change| G[Create Shortcut]
    G --> H[Display on Home Screen]
```

### Input Information

| Item Name | Description | Data Format | Initial Value | Input Range/Constraints | Required/Optional |
|-----|----|-------|-----|---------|-------|
| Pull Request Status | Can filter by Pull Request status | ・Open<br>・Merged<br>・Closed<br>・Pending<br>・All | Open | Select one from dropdown | Optional |
| Relationship with User | Can filter by user's relationship to the Pull Request | ・Created by Me<br>・Assigned to Me<br>Mentioned Me<br>・Review Requested<br>Related | Created by Me | Select one from dropdown | Optional |
| Visibility | Can filter by repository visibility | ・Show All<br>・Private Repositories Only<br>・Public Repositories Only | Show All | Select one from dropdown | Optional |
| Organization | Can filter by Pull Requests in specific organizations | List of organizations the user belongs to | Pull Requests from all organizations including those not belonging to any organization | Multiple selections allowed | Optional |
| Repository | Can filter by user's specific repository Pull Requests | List of the user's repositories | All repositories | Multiple selections allowed<br>Filtered by OR condition with organization filter | Optional |
| Sort Order | Settings for order of Pull Request list | ・Newest or Oldest<br>・Most or Least Comments<br>・Recently Updated or Oldest Updated<br>・Most Reactions | Newest | Select one condition only | Optional |

### Domain Knowledge

<!--
If there are any definitions of terms necessary to understand the functional specifications, please list them as bullet points.
Consider creating a new page with links if these terms frequently appear in other functional specifications.
-->

None

### Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant MobileApp
    participant Backend

    User ->> MobileApp: Open List Screen
    MobileApp ->> Backend: Request 30 Pull Requests for 1 page
    Backend -->> MobileApp: Return Pull Request List
    MobileApp ->> MobileApp: Display Screen
    User ->> MobileApp: Set Filters and Sort Settings
    MobileApp ->> Backend: Request Pull Request List from Page 1 with Filters/Sort Conditions
    Backend -->> MobileApp: Return Pull Request List
    MobileApp ->> MobileApp: Display List
```

### REST API Endpoint Used

<!--
List the names of REST API endpoints used by each system for this functionality as bullet points.
-->

**iOS・Android**

- 

**{microservice}**

-

### GraphQL Query/Mutation Used

<!--
List the GitHub links to GraphQL Query/Mutation files defined by the frontend for this functionality as bullet points.
-->

**iOS**

- 

**Android**

- 

---

# Related Information

## Related Requirements/Specification Documents

<!--
List the URLs of requirement/specification documents for projects that added or modified functionality for this feature as bullet points.
-->

- []()

## Related Product Backlog Items/Issues

List the URLs of Product Backlog Items or Issues for adding or modifying this feature as bullet points.

- []()

## Other Functional Specifications Related to Screens

<!--
There may be screens included in this functionality that have other functionalities.
Please list the links to their functional specification documents as bullet points.
-->

- XX Screen
    - []()

## References

<!--
Please list URLs for any other information related to this functionality as bullet points.
-->

- []()