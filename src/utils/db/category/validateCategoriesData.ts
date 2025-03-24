import validateUUID from "../../../utils/validation/validateUUID";

export default function validateCategoriesData(categoryIds: unknown): void {
	if (categoryIds == undefined) throw new Error("user/category-ids-missing");
	if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
		throw new Error("user/category-ids-missing");
	}

	for (const id of categoryIds) {
		if (id == undefined) throw new Error("user/category-ids-missing");
		validateUUID(id, "user/category-ids-");
	}
}
