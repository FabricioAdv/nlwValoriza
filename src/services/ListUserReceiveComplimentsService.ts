import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceiveComplimentsService 
{
    async execute(user_id: string)
    {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        return complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        });
    }
}

export { ListUserReceiveComplimentsService }