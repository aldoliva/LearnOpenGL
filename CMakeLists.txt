cmake_minimum_required(VERSION 3.30)
project(LearnOpenGL)

set(CMAKE_CXX_STANDARD 20)

# glfw
include_directories(${CMAKE_SOURCE_DIR}/third_party/GLFW/include)
link_directories(${CMAKE_SOURCE_DIR}/third_party/GLFW/lib)

include_directories(${CMAKE_SOURCE_DIR}/third_party/glad/include)
#add_library(glad STATIC third_party/glad/src/glad.c)

include_directories(includes)

set(CHAPTERS
        01_Getting_Started
)

SET(01_Getting_Started
        05_01_hello_triangle_exercise1
        05_02_hello_triangle_exercise2
        05_03_hello_triangle_exercise3
        06_01_shaders_interpolation
        06_02_shaders_class
        06_03_shaders_exercise1
        06_03_shaders_exercise2
        06_03_shaders_exercise3
        07_01_textures
)

if (APPLE)
    find_library(OPENGL_LIBRARY OpenGL)
    find_library(COCOA_LIBRARY Cocoa)
    find_library(IOKIT_LIBRARY IOKit)
    set(LIBS ${OPENGL_LIBRARY} ${COCOA_LIBRARY} ${IOKIT_LIBRARY})
elseif (WIN32)
    find_package(OpenGL REQUIRED)
    set(LIBS ${OpenGL_GL_LIBRARY})
endif ()

# stb_image
add_library(STB_IMAGE "src/stb_image.cpp")
set(LIBS ${LIBS} STB_IMAGE)
# glad
add_library(GLAD "src/glad.c")
set(LIBS ${LIBS} GLAD)

foreach (CHAPTER ${CHAPTERS})
    foreach (EXERCISE ${${CHAPTER}})
        file(GLOB SOURCE
                "src/${CHAPTER}/${EXERCISE}/*.h"
                "src/${CHAPTER}/${EXERCISE}/*.cpp"
        )
        string(SUBSTRING ${EXERCISE} 6 100 NAME)
        add_executable(${NAME} ${SOURCE})
        target_link_libraries(${NAME} glfw3 ${LIBS})
        target_compile_definitions(${NAME} PRIVATE SHADER_DIR="${CMAKE_SOURCE_DIR}/src/${CHAPTER}/${EXERCISE}")
    endforeach (EXERCISE)
endforeach (CHAPTER)
