import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFormClient";
import CreateBlogFromServer from "@/components/modules/user/createBlog/CreateBlogFromServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function CreateBlogPage() {
  const { data } = await blogService.getBlogPosts();
  console.log(data);
  return (
    <div>
      {/* <CreateBlogFromServer /> */}
      <CreateBlogFormClient />
      {data.data.map((item: BlogPost) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
