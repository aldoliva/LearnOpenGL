#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aColor;

out vec4 ourPosition;

void main()
{
    ourPosition = vec4(aPos, 1.0);
    gl_Position = ourPosition;
}

