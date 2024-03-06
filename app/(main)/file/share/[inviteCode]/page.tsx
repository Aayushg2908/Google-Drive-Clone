import { handleShare } from "@/actions/file";

const FileSharePage = async ({
  params,
}: {
  params: { inviteCode: string };
}) => {
  await handleShare(params.inviteCode);

  return null;
};

export default FileSharePage;
