export type User = {
	created_at: string;
	id: string;
	profile_img: string | null;
	updated_at: string | null;
	user_email: string | null;
	user_name: string | null;
};
export type Chef = {
	chef_class: string | null;
	chef_img_url: string | null;
	chef_name: string;
	created_at: string;
	description: string | null;
	id: string;
};
export type Restaurant = {
	id: string;
	restaurant_name: string;
	address: string | null;
	description: string | null;
	latitude: string | null;
	longitude: string | null;
	star: number | null;
	restaurant_img_url: string | null;
};
export type Bookmark = {
	id: number;
	restaurant_id: string | null;
	user_id: string | null;
};

export type Review = {
	id: string;
	restaurant_id: string | null;
	review_content: string | null;
	star: number | null;
	user_id: string | null;
	created_at: string | null;
};