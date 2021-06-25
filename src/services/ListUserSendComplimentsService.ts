import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserSendComplimentsService
{
    async execute(user_id: string)
    {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        return complimentsRepositories.find({
            where: {
                user_sender: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        });
    }
}

export { ListUserSendComplimentsService }