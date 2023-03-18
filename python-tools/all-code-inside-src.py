import os

def write_file_structure_to_text_file(root_dir):
    output_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"{os.path.basename(root_dir)}.txt")
    with open(output_file, 'w') as f:
        for root, dirs, files in os.walk(os.path.join(root_dir, 'src')):
            dirs[:] = [d for d in dirs if d not in ['node_modules', '.git']]
            level = root.replace(os.path.join(root_dir, 'src'), '').count(os.sep)
            indent = ' ' * 4 * level
            f.write(f"{indent}{os.path.basename(root)}/\n")
            sub_indent = ' ' * 4 * (level + 1)
            for file in files:
                if file.endswith('.js') or file.endswith('.jsx'):
                    f.write(f"{sub_indent}{file}\n")
                    with open(os.path.join(root, file), 'r') as file_contents:
                        f.write(file_contents.read())
                    f.write('\n\n')

if __name__ == '__main__':
    root_dir = '/Users/randyyono/desktop/shopping-cart-react-main-copy'
    write_file_structure_to_text_file(root_dir)
