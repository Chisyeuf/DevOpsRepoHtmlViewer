import { useEffect, useState } from "react";

function RetrieveAzureDevOpsGitItemContent(apiToken: string, organizationName: string, projectId: string, repositoryId: string, itemPath: string) {

    const [gitItemContent, setGitItemContentResponse] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function launchFetch() {
            console.log("RetrieveAzureDevOpsGitItemContent");

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${apiToken}`);
            myHeaders.append("Cookie", "VstsSession=%7B%22PersistentSessionId%22%3A%2219375a4e-116f-4e5e-9a28-a11467a31fdb%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D");

            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            fetch(`https://dev.azure.com/${organizationName}/${projectId}/_apis/git/repositories/${repositoryId}/items?path=${itemPath}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    setGitItemContentResponse(result);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setIsFetching(false);
                });
        }

        setGitItemContentResponse(null);
        setIsFetching(true);
        launchFetch();
    }, [apiToken, itemPath, organizationName, projectId, repositoryId]);

    return { gitItemContent, isFetching };
}

export default RetrieveAzureDevOpsGitItemContent;