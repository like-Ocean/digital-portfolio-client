import {Avatar, Card, Flex, Text} from "@mantine/core";

export const Comment = () => {
    return (
        <Card shadow="null" withBorder>
            <Flex
                direction="row"
                gap="sm"
                justify="flex-start"
                align="center"
            >
                <Avatar color="red" size={40}>
                    MC
                </Avatar>
                <Flex direction="column">
                    <Text fw={500} size="md">
                        Логин пользователя
                    </Text>
                    <Text size="xs" c="dimmed">
                        Дата написания: 16.10.23
                    </Text>
                </Flex>
            </Flex>
            <Text mt="md">
                Давно выяснено, что при оценке дизайна и композиции читаемый
                текст мешает сосредоточиться. Lorem Ipsum используют потому,
                что тот обеспечивает более или менее стандартное заполнение
                шаблона, а также реальное распределение букв и пробелов в
                абзацах, которое не получается при простой дубликации "Здесь
                ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие
                программы электронной вёрстки и редакторы HTML используют
                Lorem Ipsum в качестве текста по умолчанию, так что поиск по
                ключевым словам "lorem ipsum" сразу показывает, как много
                веб-страниц всё ещё дожидаются своего настоящего рождения.
            </Text>
        </Card>
    );
};
