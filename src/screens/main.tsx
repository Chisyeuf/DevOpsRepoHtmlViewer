import { useMemo } from "react";
import IFrameStringContent from "../utils/components/IFrameStringContent";
import RetrieveAzureDevOpsGitItemContent from "../utils/hooks/RetrieveAzureDevOpsGitItemContent";


function MainScreen() {

    const queryParameters = new URLSearchParams(window.location.search);
    const organization_name = queryParameters.get("organization_name") ?? "";
    const project_id = queryParameters.get("project_id") ?? "";
    const repository_id = queryParameters.get("repository_id") ?? "";
    const html_file_path = queryParameters.get("html_file_path") ?? "";
    const authorization_bearer = queryParameters.get("authorization_bearer") ?? "";

    const parameters = useMemo(() => ({
        organization_name,
        project_id,
        repository_id,
        html_file_path,
        authorization_bearer
    }), [organization_name, project_id, repository_id, html_file_path, authorization_bearer]);

    const isMissingParameter = useMemo(() => Object.values(parameters).some(param => !param),
        [parameters]);


    const { gitItemContent } = RetrieveAzureDevOpsGitItemContent(authorization_bearer, organization_name, project_id, repository_id, html_file_path);

    return (
        isMissingParameter ?
            `Missing url parameter: ${Object.entries(parameters).filter(([, value]) => !value).map(([key,]) => key).join(", ")}`
            :
            <IFrameStringContent content={gitItemContent!} />
    );
}

export default MainScreen;